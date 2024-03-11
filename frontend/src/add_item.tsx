import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


// estado: quase top, mas parâmetro CNPJ fica como undefined na URL de requisição. prov tem que usar usestate pra pegar

function AddItem() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [img, setImg] = useState('');
  const [error, setError] = useState('');
  
  
  const { CNPJ } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

    // ---------------------------------------------------------------- TODO: adicionar parâmetro img opcional
    
      const response = await fetch(`http://127.0.0.1:8000/backend/api/inventory/${CNPJ}/adicionar_item?id=${id}&nome=${nome}&description=${description}&price=${price}&quantidade=${quantidade}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Falha ao adicionar o item');
      }
      // Clear form fields on successful submission
      setId('');
      setNome('');
      setDescription('');
      setPrice('');
      setQuantidade('');
      setImg('');
      setError('');
    } catch (error) {
      console.error(error);
      setError('Falha ao adicionar o item');
    }
  };

  return (
    <div>
      <h2>Adicionar Novo Item</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </label>
        <br />
        <label>
	  Nome:
	  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
	</label>
        <br />
        <label>
          Descrição:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Preço:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <br />
        <label>
          Quantidade:
          <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
        </label>
        <br />
        <label>
          Imagem:
          <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
        </label>
        <br />
        <button type="submit">Adicionar Item</button>
      </form>
    </div>
  );
}

export default AddItem;
