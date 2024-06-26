import sqlite3

# Conexão com o banco de dados (cria o banco se não existir)
conn = sqlite3.connect('futebol.db')
cursor = conn.cursor()

# Criação da tabela de times
cursor.execute('''
CREATE TABLE IF NOT EXISTS times (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL
)
''')

# Criação da tabela de jogadores
cursor.execute('''
CREATE TABLE IF NOT EXISTS jogadores (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    time_id INTEGER,
    idade INTEGER,
    posicao TEXT,
    habilidades REAL,
    FOREIGN KEY(time_id) REFERENCES times(id)
)
''')

# Criação da tabela de resultados
cursor.execute('''
CREATE TABLE IF NOT EXISTS resultados (
    id INTEGER PRIMARY KEY,
    data TEXT,
    time_casa_id INTEGER,
    time_fora_id INTEGER,
    gols_casa INTEGER,
    gols_fora INTEGER,
    FOREIGN KEY(time_casa_id) REFERENCES times(id),
    FOREIGN KEY(time_fora_id) REFERENCES times(id)
)
''')

# Commit das mudanças e fechamento da conexão
conn.commit()
conn.close()
