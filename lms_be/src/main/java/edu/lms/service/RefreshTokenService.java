package edu.lms.service;

import edu.lms.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
    RefreshToken saveRefreshToken(String username, String rToken);

    RefreshToken verifyExpiration(RefreshToken token);

    Optional<RefreshToken> findByToken(String token);

    void revoke(String token);

}
