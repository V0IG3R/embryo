from pytrends.request import TrendReq
import time

def analyze_market_trends(keyword: str) -> str:
    """Fetch market trends from Google Trends with error handling."""
    try:
        pytrends = TrendReq()
        time.sleep(1)  # Prevent rate-limiting issues
        pytrends.build_payload([keyword], timeframe='today 5-y')
        trend_data = pytrends.interest_over_time()
        
        if not trend_data.empty:
            trend_score = trend_data[keyword].values[-1]
            return f"Current Google Trends score for '{keyword}': {trend_score} (higher means more interest)."
        else:
            return f"No trend data found for '{keyword}'. Try using a broader or different term."
    except Exception as e:
        return f"Error retrieving Google Trends data: {str(e)}"
