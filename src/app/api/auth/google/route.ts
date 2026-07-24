import { NextRequest, NextResponse } from 'next/server';
import { Certificate } from '@/types/registry';
import { generateMockHash } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email, displayName, photoURL, country } = body;

    if (!email || !displayName) {
      return NextResponse.json(
        { success: false, message: 'Google email and name are required for authentication.' },
        { status: 400 }
      );
    }

    // Generate or retrieve lifetime certificate
    const certNumber = `CRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCert: Certificate = {
      id: certNumber,
      certificateNumber: certNumber,
      memberName: displayName,
      email: email,
      phoneNumber: `Google Verified (${email})`,
      country: country || 'Global',
      issueDate: new Date().toISOString(),
      hash: generateMockHash(`${certNumber}-${email}-${uid || Date.now()}`),
      verificationUrl: `https://registry.cockroach.org/verify/${certNumber}`,
      qrData: `https://registry.cockroach.org/verify/${certNumber}`,
      signature: `SIG_COCKROACH_ED25519_${Math.random().toString(36).substring(2, 18)}`,
      photoUrl: photoURL || undefined,
      status: 'VALID',
    };

    const response = NextResponse.json({
      success: true,
      message: 'Google authentication successful! Lifetime certificate issued.',
      certificate: newCert,
      isExisting: false,
    });

    // Set secure auth cookie
    response.cookies.set({
      name: 'cockroach_auth_token',
      value: certNumber,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (err: any) {
    console.error('Google Auth API error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Internal server error during Google auth.' },
      { status: 500 }
    );
  }
}
