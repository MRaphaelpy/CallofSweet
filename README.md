# Call Of Sweet - E-commerce de Confeitaria Premium

## 🍰 Sobre o Projeto

**Sweet Delights** é uma plataforma de e-commerce especializada em produtos de confeitaria artesanal. Desenvolvida com React e Material UI, a aplicação oferece uma experiência de usuário moderna e responsiva para compra de doces gourmet, bolos, chocolates e outros produtos de confeitaria.

### ✨ Demonstração

[Ver Demo](https://your-demo-link.com)

## 🚀 Tecnologias

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Frontend**:
  - React.js
  - Material UI
  - Framer Motion (para animações)
  - Axios (para chamadas de API)
  - React Router (para navegação)

- **Backend**:
  - Spring Boot
  - JPA/Hibernate
  - MySQL
  - Spring Security (autenticação JWT)

## 📋 Funcionalidades

- ✅ Catálogo de produtos com categorias
- ✅ Visualização detalhada de produtos
- ✅ Carrinho de compras
- ✅ Sistema de avaliações e reviews
- ✅ Cadastro e gerenciamento de usuários
- ✅ Gerenciamento de endereços de entrega
- ✅ Área administrativa para gestão de produtos
- ✅ Processamento de pagamentos
- ✅ Histórico de pedidos
- (Algumas ainda não foram implementadas junamente o backend)


## 🧰 Instalação e Uso

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn
- JDK 17+
- MySQL

### Configuração do Frontend

1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/sweet-delights.git
   cd sweet-delights/frontend
   ```

2. Instale as dependências
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Inicie o servidor de desenvolvimento
   ```bash
   npm start
   # ou
   yarn start
   ```

### Configuração do Backend

1. Navegue até a pasta do backend
   ```bash
   cd ../backend
   ```

2. Configure o banco de dados no arquivo `application.properties`

3. Execute o aplicativo Spring Boot
   ```bash
   ./mvnw spring-boot:run
   # ou
   mvn spring-boot:run
   ```

## 📱 Interface

### Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

### Temas

O projeto conta com tema claro e escuro, ajustando-se automaticamente às preferências do usuário.

## 🔒 Autenticação

O sistema utiliza autenticação JWT para proteger rotas e dados do usuário. As senhas são armazenadas com criptografia segura utilizando BCrypt.

## 🛠️ Administração de Produtos

A área administrativa permite:

- Adicionar novos produtos
- Editar produtos existentes
- Gerenciar estoque
- Visualizar estatísticas de vendas
- Gerenciar categorias

## 📊 Modelos de Dados

### Produto
```json
{
  "id": 1,
  "name": "Bolo de Chocolate Premium",
  "description": "Bolo de chocolate gourmet com cobertura de ganache",
  "price": 59.99,
  "category": "DESSERT",
  "brand": "Sweet Delights",
  "imageUrl": "https://...",
  "rating": 4.8,
  "createdAt": "2023-06-25T15:08:25.484+00:00",
  "variations": [],
  "reviews": [],
  "active": true
}
```

### Usuário
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "[encrypted]",
  "phone": "(11) 98765-4321",
  "birthday": "1990-05-15",
  "role": "CUSTOMER",
  "createdAt": "2023-06-20T10:30:00.000+00:00"
}
```

### Endereço
```json
{
  "id": 1,
  "userId": 1,
  "name": "Casa",
  "street": "Rua das Flores, 123",
  "neighborhood": "Jardim Primavera",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "country": "brasil",
  "default": true
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Envie para o branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📬 Contato

Marcos Rafael - [mraphael.py@gmail.com](mailto:mraphael.py@gmail.com)

Link do Projeto: [https://github.com/MRaphaelpy/CallofSweet](https://github.com/MRaphaelpy/CallofSweet)

---

⭐️ Feito com ❤️ por [Marcos Rafael](https://github.com/MRaphaelpy) ⭐️
