import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [allFieldsFilled, setAllFieldsFilled] = useState(true)

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.idade.value = onEdit.idade;
      user.NDPS.value = onEdit.NDPS;
      user.NDSS.value = onEdit.NDSS;
      user.professor.value = onEdit.professsor;
      user.sala.value = onEdit.sala;
    }
  }, [onEdit]);

  const handleInputChange = () => {
    e.preventDefault();

    const user = ref.current;

    setAllFieldsFilled (
      !user.nome.value ||
      !user.idade.value ||
      !user.NDPS.value ||
      !user.NDSS.value ||
      !user.professor.value ||
      !user.sala.value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allFieldsFilled) {
      return toast.warn("Preencha todos os campos!");

    }
  
    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          idade: user.idade.value,
          NDPS: user.NDPS.value,
          NDSS: user.NDSS.value,
          professor: user.professor.value,
          sala: user.sala.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          idade: user.idade.value,
          NDPS: user.NDPS.value,
          NDSS: user.NDSS.value,
          professor: user.professor.value,
          sala: user.sala.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.idade.value = "";
    user.NDPS.value = "";
    user.NDSS.value = "";
    user.professor.value = "";
    user.sala.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>idade</Label>
        <Input name="idade" type="idade" onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>NDPS</Label>
        <Input name="NDPS" onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>NDSS</Label>
        <Input name="NDSS" type="NDSS" onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>professor</Label>
        <Input name="professor" onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>sala</Label>
        <Input name="sala" onChange={handleInputChange} />
      </InputArea>

      <Button type="submit" disabled={!allFieldsFilled}>
        SALVAR
      </Button>
    </FormContainer>
  );
};


export default Form;