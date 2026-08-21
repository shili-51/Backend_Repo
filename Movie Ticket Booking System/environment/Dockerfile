FROM node@sha256:2cf067cfed83d5ea958367df9f966191a942351a2df77d6f0193e162b5febfc0

# Remove python3-pytest from apt-get install
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql postgresql-contrib tmux asciinema sudo python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install modern pytest and pytest-json-ctrf via pip
RUN pip install --break-system-packages "pytest>=7.4.0" "pytest-json-ctrf>=0.5.3"

RUN sed -i "s/local   all             all                                     peer/local   all             all                                     trust/" /etc/postgresql/15/main/pg_hba.conf && \
    sed -i "s/host    all             all             127.0.0.1\/32            scram-sha-256/host    all             all             127.0.0.1\/32            trust/" /etc/postgresql/15/main/pg_hba.conf && \
    sed -i "s/host    all             all             ::1\/128                 scram-sha-256/host    all             all             ::1\/128                 trust/" /etc/postgresql/15/main/pg_hba.conf

ENV PGHOST=localhost \
    PGPORT=5432 \
    PGUSER=postgres \
    PGPASSWORD=postgres \
    PGDATABASE=moviebooking

WORKDIR /app

COPY app/package.json app/package-lock.json* /app/
RUN npm install --omit=dev

COPY app/ /app/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["bash"]
