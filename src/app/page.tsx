"use client";

import { useState } from "react";

import Input from "@/components/Input/Input";
import Table from "@/components/Elements/Table";

interface Pessoa {
  nome: string,
  email: string,
  telefone: string,
  senha: string
}

export default function App() {

  const [usuarios, setUsuarios] = useState<Pessoa[]>([]);

  const [erros, setErros] = useState<string[]>([]);
  const [toEdit, setToEdit] = useState<Pessoa>({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  })

  const [cSenha, setCSenha] = useState('');

  const registrar = () => {

    var _erros = [];

    !toEdit.nome &&
      _erros.push("nome");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    !regexEmail.test(toEdit.email) &&
      _erros.push("email");

    (toEdit.telefone.length < 8 || toEdit.telefone.length > 11) &&
      _erros.push("telefone");

    toEdit.senha !== cSenha &&
      _erros.push("senha");

    if (_erros.length == 0) {
      setErros([]);
      setUsuarios([...usuarios, toEdit]);
    }
    else
      setErros(_erros);
  }

  const onChange = (event: any) => {
    var { value, name } = event.target;

    if (name == 'telefone') {
      value = value.replace(/\D/g, '');
    }

    setErros(erros.filter(e => e !== name));
    setToEdit({ ...toEdit, [name]: value });
  }

  function formatTelefone(valor: any) {
    const n = valor.replace(/\D/g, '');

    if (n.length <= 8) {
      return n.replace(/(\d{4})(\d{0,4})/, '$1-$2');
    } else if (n.length === 9) {
      return n.replace(/(\d{5})(\d{0,4})/, '$1-$2');
    } else if (n.length === 10) {
      return n.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (n.length === 11) {
      return n.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    return valor;
  }

  return (
    <main>
      <div className="form mb-5 flex align-end">
        <Input title="Nome" value={toEdit.nome} name="nome" error={{ show: erros.includes("nome"), help: "Campo obrigatório" }} onChange={onChange} required width="w-100p" />
        <Input title="E-mail" type="text" value={toEdit.email} name="email" error={{ show: erros.includes("email"), help: "Formato inválido" }} onChange={onChange} required width="w-50p" />
        <Input title="Telefone" value={formatTelefone(toEdit.telefone)} name="telefone" error={{ show: erros.includes("telefone"), help: "Formato inválido" }} onChange={onChange} required width="w-50p" />
        <Input title="Senha" type="password" value={toEdit.senha} name="senha" error={{ show: erros.includes("senha"), help: "As senhas não conferem" }} onChange={onChange} required width="w-50p" />
        <Input title="Confirmar Senha" id="cSenha" type="password" value={cSenha} onChange={event => setCSenha(event.target.value)} required width="w-50p" />
        <button className="h-40 w-10p" onClick={registrar}>Registrar</button>
      </div>

      <hr />

      <Table
        columns={[
          { field: "nome", header: "Nome", width: "w-40p" },
          { field: "email", header: "E-mail", width: "w-30p" },
          { field: "telefone", header: "Telefone", width: "w-30p", render: (row: any) => formatTelefone(row.telefone) }
        ]}
        rows={usuarios}
      />

    </main>
  )
}
