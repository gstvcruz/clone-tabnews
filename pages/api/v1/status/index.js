import database from "/infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({
    mensagem:
      "Você acessou a página de status. No momento não há nada para consultar. Volte mais tarde.",
  });
}

export default status;
