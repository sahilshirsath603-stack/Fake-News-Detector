import pandas as pd
import os

# Sample Real News Data
true_data = [
    {"title": "Global Markets Rally as Tech Stocks Surge", "text": "Stock markets around the world experienced significant gains today, largely driven by a massive surge in technology stocks. Investors reacted positively to better-than-expected earnings reports from major tech companies.", "subject": "politicsNews", "date": "Jan 15, 2024"},
    {"title": "NASA Announces New Mission to Explore Jupiter's Moons", "text": "The National Aeronautics and Space Administration (NASA) has officially announced a new exploratory mission set to launch next year. The mission will focus on the icy moons of Jupiter, investigating their potential to harbor extraterrestrial life.", "subject": "worldnews", "date": "Feb 20, 2024"},
    {"title": "New Renewable Energy Policy Passed by the Senate", "text": "In a historic vote, the Senate has passed a comprehensive new policy aimed at investing heavily in renewable energy infrastructure. The bill allocates billions of dollars towards wind and solar energy development.", "subject": "politicsNews", "date": "Mar 10, 2024"},
    {"title": "Local Team Wins National Championship", "text": "The city erupted in celebration last night as the local sports team secured a thrilling victory in the national championship game. The final score was decided in the last few seconds, making it one of the most exciting games of the decade.", "subject": "worldnews", "date": "Apr 05, 2024"},
    {"title": "Breakthrough in Medical Research Could Cure Rare Disease", "text": "Scientists at the leading medical institute have published a groundbreaking study detailing a new treatment method that shows immense promise in curing a previously untreatable rare genetic disease.", "subject": "worldnews", "date": "May 12, 2024"}
]

# Sample Fake News Data
fake_data = [
    {"title": "ALIENS LAND IN CENTRAL PARK, DEMAND FREE WIFI", "text": "In a shocking turn of events, extraterrestrial beings have allegedly landed their spacecraft right in the middle of Central Park. Eyewitnesses claim the aliens' first demand was access to the city's free public WiFi network.", "subject": "News", "date": "Jan 1, 2024"},
    {"title": "BREAKING: Earth is Actually Flat, Scientists Admit", "text": "After years of hiding the truth, a group of prominent scientists have finally confessed during a press conference that the Earth is, in fact, flat. They claim the globe model was a massive conspiracy funded by globe manufacturers.", "subject": "politics", "date": "Feb 28, 2024"},
    {"title": "New Study Shows Eating Ice Cream Everyday Guarantees Weight Loss", "text": "A controversial new 'study' circulating online suggests that consuming a large bowl of ice cream every single day is the secret to rapid weight loss. Dietitians are heavily criticizing the claims as completely baseless.", "subject": "News", "date": "Mar 15, 2024"},
    {"title": "Government to Replace All Currency with Dogecoin", "text": "Anonymous sources within the Treasury Department have leaked plans indicating that the government is preparing to abandon traditional paper currency entirely, replacing it exclusively with the cryptocurrency Dogecoin.", "subject": "politics", "date": "Apr 01, 2024"},
    {"title": "Drinking Bleach Cures All Ailments, Claims Internet Doctor", "text": "A viral video featuring a man claiming to be a doctor states that drinking diluted bleach is a miracle cure for every known ailment. Health experts are frantically issuing warnings against this incredibly dangerous advice.", "subject": "News", "date": "May 05, 2024"}
]

def generate_csvs():
    os.makedirs('data', exist_ok=True)
    
    # Generate larger dataset by multiplying the sample (for training to work)
    true_df = pd.DataFrame(true_data * 50)
    fake_df = pd.DataFrame(fake_data * 50)
    
    true_df.to_csv('data/True.csv', index=False)
    fake_df.to_csv('data/Fake.csv', index=False)
    print("Generated sample True.csv and Fake.csv in 'data' folder.")

if __name__ == "__main__":
    generate_csvs()
