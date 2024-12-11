import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // Extract JWT from Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Do not ignore expiration; we want expiration errors to fail the request
      ignoreExpiration: false,
      // Dynamically provide the secret (public key) by using JWKS
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const client = jwksClient({
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        });

        // Parse the header from the token to get the kid (key id)
        const { header } = this.decodeJwt(rawJwtToken) as any;
        client.getSigningKey(header.kid, function (err, key) {
          if (err) {
            return done(err, null);
          }
          const signingKey = key!.getPublicKey();
          done(null, signingKey);
        });
      },
      // Optionally, validate the audience and issuer
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    });
  }

  // Implement a helper method to decode the JWT headers only.
  private decodeJwt(token: string) {
    const [header] = token.split('.');
    const decodedHeader = Buffer.from(header, 'base64').toString('utf8');
    return { header: JSON.parse(decodedHeader) };
  }

  async validate(payload: any) {
    // `payload` is the decoded JWT payload.
    // By default, simply return it to have it available in request.user
    return payload;
  }
}
