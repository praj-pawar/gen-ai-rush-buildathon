
from youtube_transcript_api import YouTubeTranscriptApi

def get_chunks(id):
    transcripts =YouTubeTranscriptApi.get_transcript(id)
    timechunks = []
    current_time_pos = transcripts[0]['start']
    chunk_num = 1
    string =" "

    for chunk in transcripts:
        
        if chunk['start']<=chunk_num*50:
            string+=chunk['text']
        else:
            timechunks.append({'text':string,'time':current_time_pos})
            string = chunk['text']
            chunk_num+=1
            current_time_pos = chunk['start']
    timechunks.append({'text':string,'time':current_time_pos})
    return timechunks