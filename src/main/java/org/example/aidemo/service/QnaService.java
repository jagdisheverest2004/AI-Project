package org.example.aidemo.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class QnaService {

    private static final Logger logger = LoggerFactory.getLogger(QnaService.class);

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final WebClient webClient;

    public QnaService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    public String getAnswer(String userInput) {

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{Map.of("text", userInput)})
                }
        );

        String response = webClient.post().uri(geminiApiUrl+geminiApiKey).header("Content-Type", "application/json").bodyValue(requestBody).retrieve()
                .bodyToMono(String.class)
                .block();
        logger.debug("Response from Gemini API: " + response);
        return response;
    }
}
