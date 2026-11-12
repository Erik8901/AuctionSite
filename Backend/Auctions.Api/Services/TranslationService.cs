
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace Auctions.Api.Services;

public class TranslationService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public TranslationService(
        HttpClient httpClient,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<TranslationResult> TranslateAsync(
        string title,
        string description,
        string targetLanguage)
    {
        var apiKey = _configuration["DeepL:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
            throw new Exception("DeepL API key is missing.");

        var request = new HttpRequestMessage(
            HttpMethod.Post,
            "v2/translate"
        );

        request.Headers.Add(
            "Authorization",
            $"DeepL-Auth-Key {apiKey}"
        );

        request.Content = JsonContent.Create(new
        {
            text = new[] { title, description },
            target_lang = targetLanguage
        });

        var response = await _httpClient.SendAsync(request);

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<DeepLResponse>();

        if (result?.Translations == null ||
            result.Translations.Count != 2)
        {
            throw new Exception("Invalid translation response.");
        }

        return new TranslationResult
        {
            Title = result.Translations[0].Text,
            Description = result.Translations[1].Text,
            OriginalLanguage =
                result.Translations[0].DetectedSourceLanguage
        };
    }
}

public class TranslationResult
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string OriginalLanguage { get; set; } = "";
}

public class DeepLResponse
{
    [JsonPropertyName("translations")]
    public List<DeepLTranslation> Translations { get; set; } = new();
}

public class DeepLTranslation
{
    [JsonPropertyName("text")]
    public string Text { get; set; } = "";

    [JsonPropertyName("detected_source_language")]
    public string DetectedSourceLanguage { get; set; } = "";
}
