import React, {useState} from 'react';
import {Button, Image, ImageBackground, Text, TextInput, View, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import imagem from './assets/snack-icon.png';
import estilos from './style';

const api = axios.create({baseURL: "https://backend--amanda-silvasil.repl.co/"});

const Drawer = createDrawerNavigator();
 
// ---- Carrinho (Input) ----
const Carrinho = (props) => {
  const [totalcarrinho, setTotalCar] = useState("");
  const [metodopgcarrinho, setMetodoCar] = useState("");
  const [parcelamentocarrinho, setParcelamentoCar] = useState("");
  const [statuscarrinho, setStatusCar] = useState("");

  return (
    <View style = {estilos.espaco}>
      <TextInput placeholder = "Valor Total do Carrinho"
          style = {estilos.texto} value = {totalcarrinho} onChangeText = {setTotalCar}/>
      <TextInput placeholder = "Método de Pagamento"
          style = {estilos.texto} value = {metodopgcarrinho} onChangeText = {setMetodoCar}/>
      <TextInput placeholder = "Parcelamento"
          style = {estilos.texto} value = {parcelamentocarrinho} onChangeText = {setParcelamentoCar}/>
      <TextInput placeholder = "Status"
          style = {estilos.texto} value = {statuscarrinho} onChangeText = {setStatusCar}/>
      
      <View style = {estilos.botao}>
        <Button color = "green" title = "Salvar" onPress = {() => {
            props.add({
                totalcarrinho,
                metodopgcarrinho,
                parcelamentocarrinho,
                statuscarrinho}) 
                props.status("Objeto inserido com sucesso");
                }}
                />
      </View>
    </View>
  );
};

// ---- Carrinho (Listagem) ----
const Carrinho_Lista = (props) => { 
  const listaTela = [];
  for (let i = 0; i < props.pedidos.length; i++) { 
    const objcarrinho = props.pedidos[i];
    listaTela.push(
      <View>
        <Text>Total Carrinho: {objcarrinho.totalcarrinho}</Text>
        <Text>Método de Pagamento: {objcarrinho.metodopgcarrinho}</Text>
        <Text>Parcelamento do Carrinho: {objcarrinho.parcelamentocarrinho}</Text> 
        <Text>Status Carrinho: {objcarrinho.statuscarrinho}</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Button title="Recarregar" onPress={()=>{
        api.get("/consultacarrinho")
        .then((info)=> {
          props.setLista(info.data.dados.rows);
          props.status(`Foram resgatados ${info.data.dados.rows.length} pedidos `)
        })
        .catch((erro)=> { 
          props.status("Erro ao consultar os pedidos");
        })
      }} />
      {listaTela}
    </View>
  );
}

// ---- Cliente (Input) ----
const Cliente = (props) => {
  const [nome_cliente, setNomeCliente] = useState("");
  const [cpf_cliente, setCpfCliente] = useState("");
  const [rg_cliente, setRgCliente] = useState("");
  const [email_cliente, setEmailCliente] = useState("");
  const [telefone_cliente, setTelefoneCliente] = useState("");
  const [cep_cliente, setCepCliente] = useState("");
  const [endereco_cliente, setEnderecoCliente] = useState("");
  const [senha_cliente, setSenhaCliente] = useState("");

  return (
    <View style = {estilos.espaco}>
      <TextInput placeholder = "Nome Completo"
          style = {estilos.texto} value = {nome_cliente} onChangeText = {setNomeCliente}/>
      <TextInput placeholder = "CPF"
          style = {estilos.texto} value = {cpf_cliente} onChangeText = {setCpfCliente}/>
      <TextInput placeholder = "RG"
          style = {estilos.texto} value = {rg_cliente} onChangeText = {setRgCliente}/>
      <TextInput placeholder = "E-mail"
          style = {estilos.texto} value = {email_cliente} onChangeText = {setEmailCliente}/>
      <TextInput placeholder = "Telefone"
          style = {estilos.texto} value = {telefone_cliente} onChangeText = {setTelefoneCliente}/>
      <TextInput placeholder = "CEP"
          style = {estilos.texto} value = {cep_cliente} onChangeText = {setCepCliente}/>
      <TextInput placeholder = "Endereço Completo"
          style = {estilos.texto} value = {endereco_cliente} onChangeText = {setEnderecoCliente}/>
      <TextInput placeholder = "Senha"
          style = {estilos.texto} value = {senha_cliente} onChangeText = {setSenhaCliente}/>
      
      <View style = {estilos.botao}>
        <Button title = "Salvar" onPress = {() => {
            props.add({
                nome_cliente,
                cpf_cliente,
                email_cliente,
                telefone_cliente,
                cep_cliente,
                endereco_cliente,
                senha_cliente
            }); props.status("Objeto inserido com sucesso");}}/>
      </View>
    </View>
  );
};

// ---- Cliente (Listagem) ----
const Cliente_Lista = (props) => { 
  const listaTela = [];
  for (let i = 0; i < props.pedidos.length; i++) { 
    const objcliente = props.pedidos[i];
    listaTela.push(
      <View>
        <Text>Nome Completo: {objcliente.nome_cliente}</Text>
        <Text>CPF: {objcliente.cpf_cliente}</Text>
        <Text>E-mail: {objcliente.email_cliente}</Text> 
        <Text>Telefone: {objcliente.telefone_cliente}</Text>
        <Text>CEP: {objcliente.cep_cliente}</Text>
        <Text>Endereço: {objcliente.endereco_cliente}</Text>
        <Text>Senha: {objcliente.senha_cliente}</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Button title="Recarregar" onPress={()=>{
        api.get("/consultacliente")
        .then((info)=> {
          props.setLista(info.data.dados.rows);
          props.status(`Foram resgatados ${info.data.dados.rows.length} pedidos `)
        })
        .catch((erro)=> { 
          props.status("Erro ao consultar os pedidos");
        })
      }} />
      {listaTela}
    </View>
  );
}

// ---- Faturamento (Input) ----
const Faturamento = (props) => {
  const [arquiteto_fat, setArquitetoFat] = useState("");
  const [perc_arquiteto_fat, setPercArquitetoFat] = useState("");
  const [fornecedor_fat, setFornecedorFat] = useState("");
  const [perc_fornecedor_fat, setPercFornecedorFat] = useState("");
  const [perc_arquidea_fat, setPercArquideaFat] = useState("");
  const [total_fat, setTotalFat] = useState("");

  return (
    <View style = {estilos.espaco}>
      <TextInput placeholder = "Arquiteto"
          style = {estilos.texto} value = {arquiteto_fat} onChangeText = {setArquitetoFat}/>
      <TextInput placeholder = "% Arquiteto"
          style = {estilos.texto} value = {perc_arquiteto_fat} onChangeText = {setPercArquitetoFat}/>
      <TextInput placeholder = "Fornecedor"
          style = {estilos.texto} value = {fornecedor_fat} onChangeText = {setFornecedorFat}/>
      <TextInput placeholder = "% Fornecedor"
          style = {estilos.texto} value = {perc_fornecedor_fat} onChangeText = {setPercFornecedorFat}/>
      <TextInput placeholder = "% Arquidea"
          style = {estilos.texto} value = {perc_arquidea_fat} onChangeText = {setPercArquideaFat}/>
      <TextInput placeholder = "Total"
          style = {estilos.texto} value = {total_fat} onChangeText = {setTotalFat}/>
      
      <View style = {estilos.botao}>
        <Button title = "Salvar" onPress = {() => {
            props.add({
                arquiteto_fat,
                perc_arquiteto_fat,
                fornecedor_fat,
                perc_fornecedor_fat,
                perc_arquidea_fat,
                total_fat
            }); props.status("Objeto inserido com sucesso");}}/>
      </View>
    </View>
  );
};

// ---- Faturamento (Listagem) ----
const Faturamento_Lista = (props) => { 
  const listaTela = [];
  for (let i = 0; i < props.pedidos.length; i++) { 
    const objfaturamento = props.pedidos[i];
    listaTela.push(
      <View>
        <Text>Arquiteto: {objfaturamento.arquiteto_fat}</Text>
        <Text>% Arquiteto: {objfaturamento.perc_arquiteto_fat}</Text>
        <Text>Fornecedor: {objfaturamento.fornecedor_fat}</Text> 
        <Text>% Fornecedor: {objfaturamento.perc_fornecedor_fat}</Text>
        <Text>% Arquidea: {objfaturamento.perc_arquidea_fat}</Text>
        <Text>Total: {objfaturamento.total_fat}</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Button title="Recarregar" onPress={()=>{
        api.get("/consultafaturamento")
        .then((info)=> {
          props.setLista(info.data.dados.rows);
          props.status(`Foram resgatados ${info.data.dados.rows.length} pedidos `)
        })
        .catch((erro)=> { 
          props.status("Erro ao consultar os pedidos");
        })
      }} />
      {listaTela}
    </View>
  );
}

// ---- Fornecedor (Input) ----
const Fornecedor = (props) => {
  const [razao_social_forn, setRazaoForn] = useState("");
  const [nome_fantasia_forn, setFantasiaForn] = useState("");
  const [cnpj_forn, setCnpjForn] = useState("");
  const [email_forn, setEmailForn] = useState("");
  const [telefone_forn, setTelefoneForn] = useState("");
  const [ramo_forn, setRamoForn] = useState("");
  const [rank_forn, setRankForn] = useState("");
  const [arquiteto_forn, setArquitetoForn] = useState("");
  const [cep_forn, setCepForn] = useState("");
  const [endereco_forn, setEnderecoForn] = useState("");
  const [senha_forn, setSenhaForn] = useState("");

  return (
    <View style = {estilos.espaco}>
      <TextInput placeholder = "Razão Social"
          style = {estilos.texto} value = {razao_social_forn} onChangeText = {setRazaoForn}/>
      <TextInput placeholder = "Nome Fantasia"
          style = {estilos.texto} value = {nome_fantasia_forn} onChangeText = {setFantasiaForn}/>
      <TextInput placeholder = "CNPJ"
          style = {estilos.texto} value = {cnpj_forn} onChangeText = {setCnpjForn}/>
      <TextInput placeholder = "E-mail"
          style = {estilos.texto} value = {email_forn} onChangeText = {setEmailForn}/>
      <TextInput placeholder = "Telefone"
          style = {estilos.texto} value = {telefone_forn} onChangeText = {setTelefoneForn}/>
      <TextInput placeholder = "Ramo"
          style = {estilos.texto} value = {ramo_forn} onChangeText = {setRamoForn}/>
      <TextInput placeholder = "Rank"
          style = {estilos.texto} value = {rank_forn} onChangeText = {setRankForn}/>
      <TextInput placeholder = "Arquiteto"
          style = {estilos.texto} value = {arquiteto_forn} onChangeText = {setArquitetoForn}/>
      <TextInput placeholder = "CEP"
          style = {estilos.texto} value = {cep_forn} onChangeText = {setCepForn}/>
      <TextInput placeholder = "Endereço Completo"
          style = {estilos.texto} value = {endereco_forn} onChangeText = {setEnderecoForn}/>
      <TextInput placeholder = "Senha"
          style = {estilos.texto} value = {senha_forn} onChangeText = {setSenhaForn}/>
      
      <View style = {estilos.botao}>
        <Button title = "Salvar" onPress = {() => {
              props.add({
                  razao_social_forn,
                  nome_fantasia_forn,
                  cnpj_forn,
                  email_forn,
                  telefone_forn,
                  ramo_forn,
                  rank_forn,
                  arquiteto_forn,
                  cep_forn,
                  endereco_forn,
                  senha_forn
              }); props.status("Objeto inserido com sucesso");}}/>
      </View>
    </View>
  );
};

// ---- Fornecedor (Listagem) ----
const Fornecedor_Lista = (props) => { 
  const listaTela = [];
  for (let i = 0; i < props.pedidos.length; i++) { 
    const objfornecedor = props.pedidos[i];
    listaTela.push(
      <View>
        <Text>Razão Social: {objfornecedor.razao_social_forn}</Text>
        <Text>Nome Fantasia: {objfornecedor.nome_fantasia_forn}</Text>
        <Text>CNPJ: {objfornecedor.cnpj_forn}</Text> 
        <Text>E-mail: {objfornecedor.email_forn}</Text>
        <Text>Telefone: {objfornecedor.telefone_forn}</Text>
        <Text>Ramo: {objfornecedor.ramo_forn}</Text>
        <Text>Rank: {objfornecedor.rank_forn}</Text>
        <Text>Arquiteto: {objfornecedor.arquiteto_forn}</Text>
        <Text>CEP: {objfornecedor.cep_forn}</Text>
        <Text>Endereço: {objfornecedor.endereco_forn}</Text>
        <Text>Senha: {objfornecedor.senha_forn}</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Button title="Recarregar" onPress={()=>{
        api.get("/consultafornecedor")
        .then((info)=> {
          props.setLista(info.data.dados.rows);
          props.status(`Foram resgatados ${info.data.dados.rows.length} pedidos `)
        })
        .catch((erro)=> { 
          props.status("Erro ao consultar os pedidos");
        })
      }} />
      {listaTela}
    </View>
  );
}

// ---- Produto (Input) ----
const Produto = (props) => {
  const [nome_prod, setNomeProd] = useState("");
  const [preco_prod, setPrecoProd] = useState("");
  const [info_prod, setInfoProd] = useState("");
  const [estoque_prod, setEstoqueProd] = useState("");
  const [grupo_prod, setGrupoProd] = useState("");
  const [quantidade_prod, setQuantidadeProd] = useState("");

  return (
    <View style = {estilos.espaco}>
      <TextInput placeholder = "Nome do Produto"
          style = {estilos.texto} value = {nome_prod} onChangeText = {setNomeProd}/>
      <TextInput placeholder = "Preço"
          style = {estilos.texto} value = {preco_prod} onChangeText = {setPrecoProd}/>
      <TextInput placeholder = "Informações"
          style = {estilos.texto} value = {info_prod} onChangeText = {setInfoProd}/>
      <TextInput placeholder = "Estoque"
          style = {estilos.texto} value = {estoque_prod} onChangeText = {setEstoqueProd}/>
      <TextInput placeholder = "Grupo"
          style = {estilos.texto} value = {grupo_prod} onChangeText = {setGrupoProd}/>
      <TextInput placeholder = "Quantidade"
          style = {estilos.texto} value = {quantidade_prod} onChangeText = {setQuantidadeProd}/>
      
      <View style = {estilos.botao}>
        <Button title = "Salvar" onPress = {() => {
              props.add({
                  nome_prod,
                  preco_prod,
                  info_prod,
                  estoque_prod,
                  grupo_prod,
                  quantidade_prod
              }); props.status("Objeto inserido com sucesso");}}/>
      </View>
    </View>
  );
};

// ---- Produto (Listagem) ----
const Produto_Lista = (props) => { 
  const listaTela = [];
  for (let i = 0; i < props.pedidos.length; i++) { 
    const objproduto = props.pedidos[i];
    listaTela.push(
      <View>
        <Text>Nome do Produto: {objproduto.nome_prod}</Text>
        <Text>Preço: {objproduto.preco_prod}</Text>
        <Text>Informações: {objproduto.info_prod}</Text> 
        <Text>Estoque: {objproduto.estoque_prod}</Text>
        <Text>Grupo: {objproduto.grupo_prod}</Text>
        <Text>Quantidade: {objproduto.quantidade_prod}</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Button title="Recarregar" onPress={()=>{
        api.get("/consultaproduto")
        .then((info)=> {
          props.setLista(info.data.dados.rows);
          props.status(`Foram resgatados ${info.data.dados.rows.length} pedidos `)
        })
        .catch((erro)=> { 
          props.status("Erro ao consultar os pedidos");
        })
      }} />
      {listaTela}
    </View>
  );
}

// ---- Projeto (Input) ----
const Projeto = (props) => {
  const [obs_proj, setObsProj] = useState("");
  const [conclusao_proj, setConclusaoProj] = useState("");
  const [status_proj, setStatusProj] = useState("");
  const [valor_proj, setValorProj] = useState("");
  const [valor_liq_proj, setValorliqproj] = useState("");
  const [rank_proj, setRankProj] = useState("");
  const [inicio_proj, setInicioProj] = useState("");
  const [tipo_local_proj, setTipoProj] = useState("");
  const [metro_quadrado_proj, setMetroProj] = useState("");

  return (
    <View style = {estilos.espaco}>
      <TextInput placeholder = "Observação"
          style = {estilos.texto} value = {obs_proj} onChangeText = {setObsProj}/>
      <TextInput placeholder = "Conclusão do Projeto"
          style = {estilos.texto} value = {conclusao_proj} onChangeText = {setConclusaoProj}/>
      <TextInput placeholder = "Status do Projeto"
          style = {estilos.texto} value = {status_proj} onChangeText = {setStatusProj}/>
      <TextInput placeholder = "Valor do Projeto"
          style = {estilos.texto} value = {valor_proj} onChangeText = {setValorProj}/>
      <TextInput placeholder = "Valor liquido do Projeto"
          style = {estilos.texto} value = {valor_liq_proj} onChangeText = {setValorliqproj}/>
      <TextInput placeholder = "Rank"
          style = {estilos.texto} value = {rank_proj} onChangeText = {setRankProj}/>
      <TextInput placeholder = "Início do Projeto"
          style = {estilos.texto} value = {inicio_proj} onChangeText = {setInicioProj}/>
      <TextInput placeholder = "Tipo de Local do Projeto"
          style = {estilos.texto} value = {tipo_local_proj} onChangeText = {setTipoProj}/>
      <TextInput placeholder = "Metro Quadrado"
          style = {estilos.texto} value = {metro_quadrado_proj} onChangeText = {setMetroProj}/>
          <View style = {estilos.botao}>
        <Button title = "Calcular" onPress = {() => {
              const valor_liq_proj = valor_proj /100 *8
              }}/>
      </View>
      <View style = {estilos.botao}>
        <Button title = "Salvar" onPress = {() => {
              props.add({
                  obs_proj,
                  conclusao_proj,
                  status_proj,
                  valor_proj,
                  valor_liq_proj,
                  rank_proj,
                  inicio_proj,
                  tipo_local_proj,
                  metro_quadrado_proj
              }); 
              props.status("Objeto inserido com sucesso");
              }}
              />
      </View>
    </View>
  );
};


// ---- Projeto (Listagem) ----
const Projeto_Lista = (props) => { 
  const listaTela = [];
  for (let i = 0; i < props.pedidos.length; i++) { 
    const objprojeto = props.pedidos[i];
    listaTela.push(
      <View>
        <Text>Observação: {objprojeto.obs_proj}</Text>
        <Text>Conclusão do Projeto: {objprojeto.conclusao_proj}</Text>
        <Text>Status do Projeto: {objprojeto.status_proj}</Text> 
        <Text>Valor do Projeto: {objprojeto.valor_proj}</Text>
        <Text>Valor Liquido do Projeto: {objprojeto.valor_liq_proj}</Text>
        <Text>Rank: {objprojeto.rank_proj}</Text>
        <Text>Início do Projeto: {objprojeto.inicio_proj}</Text>
        <Text>Tipo de Local do Projeto: {objprojeto.tipo_local_proj}</Text>
        <Text>Metro Quadrado: {objprojeto.metro_quadrado_proj}</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Button title="Recarregar" onPress={()=>{
        api.get("/consultaprojeto")
        .then((info)=> {
          props.setLista(info.data.dados.rows);
          props.status(`Foram resgatados ${info.data.dados.rows.length} pedidos `)
        })
        .catch((erro)=> { 
          props.status("Erro ao consultar os pedidos");
        })
      }} />
      {listaTela}
    </View>
  );
}

// ---- Configurações ----
const Configuracoes = (props) =>
<View>
  <Button title="Reset" onPress={()=> {
    api.delete("/reset")
    .then(() => {
      props.status("Tabelas criadas com sucesso");
    })
    .catch(() => {
      props.status("Erro ao criar a tabela");
    });
    Alert.alert(
      "Status Atual",
      "Tabelas Criadas!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );}}/>
</View>
// ---- Alerta da Configuração ----

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    
const Principal = () => {
  const [lista, setLista] = useState([]);
  const [status, setStatus] = useState("");

  // Adicionar itens à listagem do Carrinho
  const add = (objcarrinho) => {
    api.post("/inserircarrinho", objcarrinho)
    .then((info)=> {
      setStatus("Registro inserido com sucesso");
    })
    .catch((erro)=> {
      setStatus("Erro ao inserir o registro");
    });
  }

  // Adicionar itens à listagem do Cliente
  const addcli = (objcliente) => {
    api.post("/inserircliente", objcliente)
    .then((info)=> {
      setStatus("Registro inserido com sucesso");
    })
    .catch((erro)=> {
      setStatus("Erro ao inserir o registro");
    });
  }

  // Adicionar itens à listagem do Faturamento
  const addfat = (objfaturamento) => {
    api.post("/inserirfaturamento", objfaturamento)
    .then((info)=> {
      setStatus("Registro inserido com sucesso");
    })
    .catch((erro)=> {
      setStatus("Erro ao inserir o registro");
    });
  }

  // Adicionar itens à listagem do Fornecedor
  const addforn = (objfornecedor) => {
    api.post("/inserirfornecedor", objfornecedor)
    .then((info)=> {
      setStatus("Registro inserido com sucesso");
    })
    .catch((erro)=> {
      setStatus("Erro ao inserir o registro");
    });
  }

  // Adicionar itens à listagem do Produto
  const addprod = (objproduto) => {
    api.post("/inserirproduto", objproduto)
    .then((info)=> {
      setStatus("Registro inserido com sucesso");
    })
    .catch((erro)=> {
      setStatus("Erro ao inserir o registro");
    });
  }

  // Adicionar itens à listagem do Projeto
  const addproj = (objprojeto) => {
    api.post("/inserirprojeto", objprojeto)
    .then((info)=> {
      setStatus("Registro inserido com sucesso");
    })
    .catch((erro)=> {
      setStatus("Erro ao inserir o registro");
    });
  }

  return (
    <NavigationContainer>
    <Text> Status Atual:{status} </Text>
      <View style = {estilos.flex1}>
        <ImageBackground source = {imagem} style = {{flex: 1}}>
        </ImageBackground>

        <View style = {estilos.flex2}>
          <Drawer.Navigator initialRouteName = "Teste">
            <Drawer.Screen name = "Carrinho">
              {() => <Carrinho add = {add} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Carrinho Lista">
              {() => <Carrinho_Lista pedidos = {lista} setLista = {setLista} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Cliente">
              {() => <Cliente add = {addcli} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Cliente Lista">
              {() => <Cliente_Lista pedidos = {lista} setLista = {setLista} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Faturamento">
              {() => <Faturamento add = {addfat} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Faturamento Lista">
              {() => <Faturamento_Lista pedidos = {lista} setLista = {setLista} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Fornecedor">
              {() => <Fornecedor add = {addforn} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Fornecedor Lista">
              {() => <Fornecedor_Lista pedidos = {lista} setLista = {setLista} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Produto">
              {() => <Produto add = {addprod} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Produto Lista">
              {() => <Produto_Lista pedidos = {lista} setLista = {setLista} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Projeto">
              {() => <Projeto add = {addproj} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Projeto Lista">
              {() => <Projeto_Lista pedidos = {lista} setLista = {setLista} status = {setStatus}/>}
            </Drawer.Screen>
            <Drawer.Screen name = "Reset">
              {() => <Configuracoes status = {setStatus}/>}
            </Drawer.Screen>
          </Drawer.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
};

export default Principal;