FROM alpine
WORKDIR /app
RUN apk add --no-cache g++ bash coreutils diffutils
COPY generative.h .
COPY mn_load.sh .
RUN chmod +x mn_load.sh
RUN  g++ -std=c++20 -x c++-header /usr/include/c++/14.2.0/x86_64-alpine-linux-musl/bits/stdc++.h
CMD ["bash", "./mn_load.sh"]
