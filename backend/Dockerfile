FROM alpine
WORKDIR /app
RUN apk add --no-cache g++ bash coreutils diffutils
COPY generative.h .
COPY mn_load.sh .
RUN chmod +x mn_load.sh
CMD ["bash", "./mn_load.sh"]
