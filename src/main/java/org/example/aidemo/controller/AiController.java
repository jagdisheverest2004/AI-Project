package org.example.aidemo.controller;

import org.example.aidemo.model.ChatMessage;
import org.example.aidemo.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private ChatService chatService; // Use ChatService

    @Autowired
    private JdbcTemplate jdbcTemplate; // Inject for health check

    @PostMapping("/question")
    public ResponseEntity<ChatMessage> getAiResponse(@RequestBody Map<String, String> payload) {
        String userInput = payload.get("question");
        ChatMessage aiResponse = chatService.getAnswer(userInput);
        return ResponseEntity.ok(aiResponse);
    }

    @GetMapping("/chat/history")
    public ResponseEntity<List<ChatMessage>> getChatHistory() {
        return ResponseEntity.ok(chatService.getChatHistory());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        try {
            // Check database connection
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return ResponseEntity.ok(Map.of("status", "UP", "database", "connected"));
        } catch (Exception e) {
            return ResponseEntity.status(503).body(Map.of("status", "DOWN", "database", "disconnected"));
        }
    }
}