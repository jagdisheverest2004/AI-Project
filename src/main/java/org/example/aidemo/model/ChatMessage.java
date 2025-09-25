package org.example.aidemo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String message;
    private boolean isUser;
    private Instant timestamp;

    public ChatMessage(String message, boolean isUser, Instant timestamp) {
        this.message = message;
        this.isUser = isUser;
        this.timestamp = timestamp;
    }
}