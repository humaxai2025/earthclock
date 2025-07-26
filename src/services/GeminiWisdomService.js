
class GeminiWisdomService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    
    // Minimal emergency fallbacks (only used if API completely unavailable)
    this.emergencyTips = [
      "🌱 AI environmental wisdom unavailable - check your connection",
      "🤖 Reconnecting to generate fresh climate insights...", 
      "🌍 Real-time environmental AI wisdom loading..."
    ];
    
    this.currentTipIndex = 0;
    this.dailyTips = [];
    this.lastFetchDate = null;
    this.isAIPreferred = true; // Always prefer AI over fallbacks
    
    // Initialize with cached tips if available
    this.loadCachedTips();
  }

  // Main method to get current tip - checks if daily fetch is needed
  async getCurrentTip(environmentalData) {
    try {
      // Check if we need to fetch new daily tips
      if (this.shouldFetchNewTips()) {
        await this.fetchDailyTips(environmentalData);
      }
      
      // Return current tip from daily collection
      return this.getNextTip();
      
    } catch (error) {
      console.error('Error getting wisdom tip:', error);
      return this.getFallbackTip();
    }
  }

  // Check if we need to fetch new tips (once per day)
  shouldFetchNewTips() {
    const today = new Date().toDateString();
    return !this.lastFetchDate || this.lastFetchDate !== today || this.dailyTips.length === 0;
  }

  // Fetch wisdom tips from Gemini AI (AI-first approach)
  async fetchDailyTips(environmentalData) {
    if (!this.apiKey) {
      console.warn('🤖 No Gemini API key - AI wisdom unavailable');
      this.useEmergencyMode();
      return;
    }

    try {
      console.log('🤖 Generating fresh AI wisdom from Gemini...');
      
      const prompt = this.generateContextualPrompt(environmentalData);
      
      // Retry up to 3 times for better AI reliability
      let generatedTips = [];
      
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`🔄 AI Generation Attempt ${attempt}/3...`);
          const response = await this.callGeminiAPI(prompt);
          
          if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
            const content = response.candidates[0].content.parts[0].text;
            generatedTips = this.parseTipsFromResponse(content);
            
            // Success if we get at least 5 good AI tips
            if (generatedTips.length >= 2) {
              console.log(`✅ AI Success! Generated ${generatedTips.length} contextual tips on attempt ${attempt}`);
              break;
            } else {
              console.warn(`⚠️ AI returned only ${generatedTips.length} tips on attempt ${attempt}, retrying...`);
            }
          } else if (response?.candidates?.[0]?.finishReason) {
            console.warn(`⚠️ AI content blocked: ${response.candidates[0].finishReason}`);
            // Try with simpler prompt on content blocking
            if (attempt < 3) continue;
          }
        } catch (attemptError) {
          console.error(`❌ AI Attempt ${attempt} failed:`, attemptError.message);
          if (attempt === 3) throw attemptError;
        }
      }
      
      if (generatedTips.length >= 5) {
        // Pure AI mode - use only AI-generated tips
        this.dailyTips = generatedTips.slice(0, 12);
        this.saveTipsToCache();
        this.lastFetchDate = new Date().toDateString();
        console.log(`🎉 Daily AI wisdom ready: ${this.dailyTips.length} fresh contextual tips`);
        console.log('📝 Sample AI tip:', this.dailyTips[0]);
      } else {
        console.error('❌ AI generation failed after 3 attempts - using emergency mode');
        this.useEmergencyMode();
      }
      
    } catch (error) {
      console.error('🚫 AI service completely unavailable:', error.message);
      this.useEmergencyMode();
    }
  }

  // Emergency mode when AI is unavailable  
  useEmergencyMode() {
    this.dailyTips = [...this.emergencyTips];
    this.lastFetchDate = new Date().toDateString();
    this.saveTipsToCache();
    console.log('🆘 Using emergency mode - please check API key and connection');
  }

  // Generate contextual prompt based on current environmental data
  generateContextualPrompt(environmentalData) {
    const currentSeason = this.getCurrentSeason();
    const timeOfDay = this.getTimeOfDay();
    const urgencyLevel = this.getUrgencyLevel(environmentalData);
    
    return `Generate 10 environmental wisdom tips that are contextual to today's climate crisis.

🌍 CURRENT CLIMATE REALITY:
• CO₂: ${environmentalData.co2} ppm (highest in human history - CRITICAL)
• Global Temperature: +${environmentalData.temperature}°C above pre-industrial baseline
• Arctic Ice: ${environmentalData.arcticIce}% coverage (record low)
• Renewables: ${environmentalData.renewableEnergy}% (growing but needs acceleration)
• Season: ${currentSeason} | Time: ${timeOfDay} | Crisis Level: ${urgencyLevel}

📝 FORMAT REQUIREMENTS:
• Start each tip with ONE emoji
• Keep each tip 25-70 words
• Include specific numbers, percentages, or measurable actions
• Make tips immediate and actionable
• Reference the urgency of current climate data when relevant
• Mix energy, transport, food, water, waste, and nature categories

✅ EXAMPLES:
🌱 With CO₂ at ${environmentalData.co2}ppm, switching to plant-based meals 3x weekly saves 1,200kg CO₂ annually
💧 Arctic ice at ${environmentalData.arcticIce}% - every 5-minute shower saves 25 gallons compared to 10-minute showers
🚲 Temperature rising +${environmentalData.temperature}°C - biking 10km prevents 2.6kg CO₂ that driving would emit
♻️ Renewables at ${environmentalData.renewableEnergy}% - choose clean energy plans to accelerate the transition

Generate 10 contextual wisdom tips in the same format:`;
  }

  // Call Gemini API
  async callGeminiAPI(prompt) {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('API request timeout')), 15000)
    );

    const fetchPromise = fetch(`${this.baseUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
          candidateCount: 1
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  // Parse tips from Gemini response
  parseTipsFromResponse(content) {
    try {
      console.log('🔍 Raw Gemini response:', content);
      
      // Split by newlines and clean up
      const lines = content.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      console.log('📝 Parsed lines:', lines);
      
      // More flexible tip validation
      const tips = lines.filter(line => {
        // Check if line looks like a tip: has emoji and reasonable length
        const hasEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F680}-\u{1F6FF}]/u.test(line);
        const hasContent = line.length >= 15 && line.length <= 120;
        const isNotHeader = !line.toLowerCase().includes('tips') && !line.toLowerCase().includes('wisdom');
        const notNumbered = !line.match(/^\d+[\.\)]/); // Remove numbered lists
        
        return hasEmoji && hasContent && isNotHeader && notNumbered;
      }).slice(0, 12); // Ensure max 12 tips
      
      console.log('✅ Validated tips:', tips);
      
      return tips;
    } catch (error) {
      console.error('Error parsing tips:', error);
      return [];
    }
  }

  // Get next tip in rotation (AI-first)
  getNextTip() {
    if (this.dailyTips.length === 0) {
      return "🤖 Generating AI environmental wisdom...";
    }
    
    const tip = this.dailyTips[this.currentTipIndex];
    this.currentTipIndex = (this.currentTipIndex + 1) % this.dailyTips.length;
    
    return tip;
  }

  // Get fallback tip (only for emergency)
  getFallbackTip() {
    const tip = this.emergencyTips[this.currentTipIndex % this.emergencyTips.length];
    this.currentTipIndex = (this.currentTipIndex + 1) % this.emergencyTips.length;
    return tip;
  }

  // Cache management
  saveTipsToCache() {
    try {
      const cacheData = {
        tips: this.dailyTips,
        date: this.lastFetchDate,
        index: this.currentTipIndex
      };
      localStorage.setItem('earthWisdomCache', JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Could not save tips to cache:', error);
    }
  }

  loadCachedTips() {
    try {
      const cached = localStorage.getItem('earthWisdomCache');
      if (cached) {
        const cacheData = JSON.parse(cached);
        const today = new Date().toDateString();
        
        // Use cached tips if they're from today
        if (cacheData.date === today && cacheData.tips && cacheData.tips.length > 0) {
          this.dailyTips = cacheData.tips;
          this.lastFetchDate = cacheData.date;
          this.currentTipIndex = cacheData.index || 0;
          console.log('📱 Loaded cached Earth wisdom tips');
        }
      }
    } catch (error) {
      console.warn('Could not load cached tips:', error);
    }
  }

  // Helper methods
  getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
  }

  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  }

  getUrgencyLevel(environmentalData) {
    if (environmentalData.co2 > 430) return 'Critical';
    if (environmentalData.co2 > 420) return 'High';
    if (environmentalData.co2 > 410) return 'Moderate';
    return 'Low';
  }

  // Public method to force refresh tips (for testing or manual refresh)
  async forceRefresh(environmentalData) {
    this.lastFetchDate = null;
    this.dailyTips = [];
    return await this.getCurrentTip(environmentalData);
  }

  // Get statistics about current tips (AI-focused)
  getStats() {
    const isUsingEmergencyMode = this.dailyTips.every(tip => this.emergencyTips.includes(tip));
    const isUsingAI = !isUsingEmergencyMode && this.dailyTips.length > 0;
    
    return {
      totalTips: this.dailyTips.length,
      currentIndex: this.currentTipIndex,
      lastFetchDate: this.lastFetchDate,
      isUsingAI: isUsingAI,
      isUsingEmergencyMode: isUsingEmergencyMode,
      hasApiKey: !!this.apiKey,
      tipsSample: this.dailyTips.slice(0, 3), // First 3 tips for debugging
      mode: isUsingAI ? 'AI-Powered' : isUsingEmergencyMode ? 'Emergency' : 'Loading'
    };
  }

  // Debug method to test API directly
  async debugAPI(environmentalData) {
    if (!this.apiKey) {
      return { error: 'No API key configured' };
    }

    try {
      const prompt = this.generateContextualPrompt(environmentalData);
      console.log('🔍 Debug: Sending prompt:', prompt);
      
      const response = await this.callGeminiAPI(prompt);
      console.log('🔍 Debug: Raw API response:', response);
      
      if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const content = response.candidates[0].content.parts[0].text;
        console.log('🔍 Debug: Extracted content:', content);
        
        const tips = this.parseTipsFromResponse(content);
        console.log('🔍 Debug: Parsed tips:', tips);
        
        return {
          success: true,
          rawContent: content,
          parsedTips: tips,
          tipCount: tips.length,
          prompt: prompt
        };
      } else if (response?.candidates?.[0]?.finishReason) {
        return { 
          error: `Gemini blocked content. Reason: ${response.candidates[0].finishReason}`,
          finishReason: response.candidates[0].finishReason,
          response 
        };
      } else {
        return { 
          error: 'Invalid response structure', 
          response,
          expectedPath: 'response.candidates[0].content.parts[0].text'
        };
      }
    } catch (error) {
      return { 
        error: error.message, 
        stack: error.stack,
        apiKey: this.apiKey ? 'Present' : 'Missing'
      };
    }
  }
}

export default new GeminiWisdomService();