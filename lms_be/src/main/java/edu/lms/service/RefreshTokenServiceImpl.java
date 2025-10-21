package edu.lms.service;

import edu.lms.entity.RefreshToken;
import edu.lms.entity.User;
import edu.lms.repository.RefreshTokenRepository;
import edu.lms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${jwt.refresh-expiration-ms:604800000}")
    private Long refreshTokenDuration;

    @Override
    @Transactional
    public RefreshToken saveRefreshToken(String username, String rToken) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

        // ?? state - transient
        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(rToken)
                .expiryDate(Instant.now().plusMillis(refreshTokenDuration))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.isExpired()) {
            refreshTokenRepository.delete(token);

            throw new RuntimeException("Token is expired");
        }
        return token;
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public void revoke(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token not found"));

        refreshToken.setRevoked(true);
        refreshToken.setRevokeAt(Instant.now());

        refreshTokenRepository.save(refreshToken);
    }


}
