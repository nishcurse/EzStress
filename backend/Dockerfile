FROM gcc:latest
RUN apt-get update && apt-get install -y dos2unix
WORKDIR /app
COPY mn_load.sh ./
COPY generative.h ./
RUN mkdir tests 
RUN dos2unix mn_load.sh
RUN chmod +x mn_load.sh
CMD ["./mn_load.sh"]