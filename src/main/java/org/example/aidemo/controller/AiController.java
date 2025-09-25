package org.example.aidemo.controller;

import org.example.aidemo.service.QnaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    // Define your endpoints here

    @Autowired
    public QnaService qnaService;

    @PostMapping("/question")
    public ResponseEntity<?> getAiResponse(@RequestBody Map<String,String> payload) {
        // Implement your AI logic here
        String userInput = payload.get("question");
        String answer = qnaService.getAnswer(userInput);

        Map<String, Object> response = Map.of(
                "response", answer,
                "timestamp", java.time.Instant.now().toString()
        );

        return ResponseEntity.ok(response);
    }
}
