package org.example.aidemo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.aidemo.model.ChatMessage;
import org.example.aidemo.repository.ChatMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    private static final Logger logger = LoggerFactory.getLogger(ChatService.class);

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final WebClient webClient;
    private final ChatMessageRepository chatMessageRepository;
    private final ObjectMapper objectMapper; // ++ ADD THIS ++

    public ChatService(WebClient.Builder webClientBuilder, ChatMessageRepository chatMessageRepository, ObjectMapper objectMapper) { // ++ ADD THIS ++
        this.webClient = webClientBuilder.build();
        this.chatMessageRepository = chatMessageRepository;
        this.objectMapper = objectMapper; // ++ ADD THIS ++
    }

    public ChatMessage getAnswer(String userInput) {
        // Save user's message
        chatMessageRepository.save(new ChatMessage(userInput, true, Instant.now()));

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{Map.of("text", userInput)})
                }
        );

        String geminiResponse = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        logger.debug("Response from Gemini API: " + geminiResponse);

        // ++ START OF CHANGES: PARSE THE RESPONSE ++
        String extractedText;
        try {
            JsonNode rootNode = objectMapper.readTree(geminiResponse);
            extractedText = rootNode
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText("Sorry, I could not extract a response."); // Default text on failure
        } catch (Exception e) {
            logger.error("Failed to parse Gemini API response", e);
            extractedText = "Sorry, the response was in an unexpected format.";
        }
        // ++ END OF CHANGES ++

        // Save AI's response with the extracted text and return it
        ChatMessage aiMessage = new ChatMessage(extractedText, false, Instant.now());
        return chatMessageRepository.save(aiMessage);
    }

    public List<ChatMessage> getChatHistory() {
        return chatMessageRepository.findAll();
    }
}