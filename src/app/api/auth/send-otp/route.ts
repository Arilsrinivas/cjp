import { NextRequest, NextResponse } from 'next/server';
import { generate6DigitOtp, createHmacToken } from '@/lib/auth/otpService';
import { sendRealSms } from '@/lib/auth/smsProviders';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phoneNumber, countryCode, country } = body;

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      return NextResponse.json(
        { success: false, message: 'Valid mobile phone number is required.' },
        { status: 400 }
      );
    }

    const fullPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `${countryCode || '+91'} ${phoneNumber}`;

    // 1. Generate 6-digit random OTP code
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

    // 3. Dispatch real SMS via configured provider (Twilio, Fast2SMS, or sandbox)
    const smsResult = await sendRealSms({
      phoneNumber: fullPhone,
      otpCode,
      memberName: fullName,
    });

    return NextResponse.json({
      success: true,
      message: smsResult.sent
        ? `OTP code sent successfully via ${smsResult.provider}.`
        : `OTP code generated. SMS dispatch note: ${smsResult.error || 'Check server logs.'}`,
      sessionId,
      sessionToken,
      // For instant dev testing when no paid provider credentials are set
      demoOtpCode: process.env.NODE_ENV !== 'production' ? otpCode : undefined,
    });
  } catch (err: any) {
    console.error('Send OTP API error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Internal server error while sending OTP.' },
      { status: 500 }
    );
  }
}
