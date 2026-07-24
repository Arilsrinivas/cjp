import { NextRequest, NextResponse } from 'next/server';
import { verifyHmacToken } from '@/lib/auth/otpService';
import { Certificate } from '@/types/registry';
import { generateMockHash } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionToken, otp, phoneNumber, fullName, country } = body;

    if (!otp || otp.trim().length !== 6) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP code. Enter 6 numeric digits.' },
        { status: 400 }
      );
    }

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'Missing session token. Please resend OTP.' },
        { status: 400 }
      );
    }

    // 1. Verify HMAC Token & OTP Code
    const verification = verifyHmacToken(sessionToken, otp, phoneNumber);
    if (!verification.valid) {
      return NextResponse.json(
        { success: false, message: verification.reason || 'Verification failed.' },
        { status: 400 }
      );
    }

    // 2. Issue or retrieve Lifetime Certificate
    const certNumber = `CRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert: Certificate = {
      id: certNumber,
      certificateNumber: certNumber,
      memberName: fullName || 'Verified Cockroach Member',
      phoneNumber: phoneNumber,
      country: country || 'India',
      issueDate: new Date().toISOString(),
      hash: generateMockHash(`${certNumber}-${phoneNumber}-${Date.now()}`),
      verificationUrl: `https://registry.cockroach.org/verify/${certNumber}`,
      qrData: `https://registry.cockroach.org/verify/${certNumber}`,
      signature: `SIG_COCKROACH_ED25519_${Math.random().toString(36).substring(2, 18)}`,
      status: 'VALID',
    };

    const response = NextResponse.json({
      success: true,
      message: 'OTP verified successfully! Lifetime certificate issued.',
      certificate: newCert,
      isExisting: false,
    });

    // Set secure HTTP-only auth cookie
    response.cookies.set({
      name: 'cockroach_auth_token',
      value: certNumber,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  } catch (err: any) {
    console.error('Verify OTP API error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Internal server error while verifying OTP.' },
      { status: 500 }
    );
  }
}
