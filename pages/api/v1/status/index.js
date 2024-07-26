function status(request, response) {
  response.status(200).json({
    mensagem:
      "Você acessou a página de status. No momento não há nada para consultar. Volte mais tarde.",
  });
}

export default status;
