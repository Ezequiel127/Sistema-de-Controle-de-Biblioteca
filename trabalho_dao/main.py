from model.jogo import Jogo
from dao.create_jogo import CreateJogo
from dao.read_jogos import ReadJogos
from dao.update_jogo import UpdateJogo
from dao.delete_jogo import DeleteJogo
from dao.aggregation_jogo import AggregationJogo
from dao.base_dao import BaseDAO

if __name__ == "__main__":
    with BaseDAO().conectar() as conn:
        cur = conn.cursor()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS jogos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            categoria TEXT NOT NULL,
            nota REAL CHECK(nota >= 0 AND nota <= 10),
            tier TEXT NOT NULL
        );
        """)
        conn.commit()

    jogo = Jogo("Celeste", "Plataforma", 9.2, "A")
    CreateJogo().adicionar(jogo)

    print("\nLista de jogos:")
    for linha in ReadJogos().listar():
        print(linha)

    UpdateJogo().atualizar_nota(1, 8.7)



    agg = AggregationJogo()
    print("\nMédia das notas:", agg.calcular_media_notas())
    agg.contar_por_tier()
    agg.contar_por_categoria()
