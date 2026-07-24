import { NextRequest, NextResponse } from 'next/server';
import { generate6DigitOtp, createHmacToken } from '@/lib/auth/otpService';
import { sendRealSms } from '@/lib/auth/smsProviders';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phoneNumber, countryCode } = body;

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      return NextResponse.json(
        { success: false, message: 'Valid mobile phone number is required.' },
        { status: 400 }
      );
    }

    const fullPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `${countryCode || '+91'} ${phoneNumber}`;

    // 1. Generate secure 6-digit OTP code
    const otpCode = generate6DigitOtp();
    const sessionId = `SES_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // 2. Create HMAC SHA-256 session token
    const sessionToken = createHmacToken({
      sessionId,
      otpCode,
      phoneNumber: fullPhone,
      expiresAt,
    });

    // 3. Dispatch SMS via Twilio, Fast2SMS, or Sandbox
    const smsResult = await sendRealSms({
      phoneNumber: fullPhone,
      otpCode,
      memberName: fullName,
    });

    const isRealGateway = smsResult.provider === 'Twilio' || smsResult.provider === 'Fast2SMS';

    return NextResponse.json({
      success: true,
      message: isRealGateway
        ? `SMS text message dispatched to ${fullPhone} via ${smsResult.provider}.`
        : `OTP code generated for ${fullPhone}.`,
      sessionId,
      sessionToken,
      provider: smsResult.provider,
      // Attached for instant delivery when carrier SMS key is not yet added in Vercel Env Vars
      otpCodeHint: !isRealGateway ? otpCode : undefined,
    });
  } catch (err: any) {
    console.error('Send OTP API error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Internal server error while dispatching OTP.' },
      { status: 500 }
    );
  }
}
