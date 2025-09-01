from dao.base_dao import BaseDAO

class DeleteJogo(BaseDAO):
    def remover(self, id: int):
        sql = "DELETE FROM jogos WHERE id = ?"
        with self.conectar() as conn:
            cur = conn.cursor()
            cur.execute(sql, (id,))
            conn.commit()
