from dao.base_dao import BaseDAO
from model.jogo import Jogo

class CreateJogo(BaseDAO):
    def adicionar(self, jogo: Jogo):
        sql = "INSERT INTO jogos (nome, categoria, nota, tier) VALUES (?, ?, ?, ?)"
        with self.conectar() as conn:
            cur = conn.cursor()
            cur.execute(sql, (jogo.nome, jogo.categoria, jogo.nota, jogo.tier))
            conn.commit()
