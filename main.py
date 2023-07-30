from Chunks import get_chunks
from Engine import load_engine,get_query,get_summary

id=input()
chunks = get_chunks(id)
eng = load_engine(chunks)
summary = get_summary(eng)
print("Summary:\n")
for s in summary:
    print(s,"\n")
print("Enter the query: ")
query = input()
ans,time = get_query(eng,query)
print("Ans: ",ans,"\nTime stamp: ",time)