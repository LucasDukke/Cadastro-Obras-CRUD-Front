import {StyleSheet} from 'react-native';

const estilos = StyleSheet.create({
  texto: {
            fontSize: 18,
            borderColor: 'rgba(200, 200, 200, 1)',
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginHorizontal: 25,
            backgroundColor: "white"
  },
  titulo: {
            fontSize: 30,
            color: 'white',
            backgroundColor: 'rgba(52, 52, 52, 0.6)',
            borderRadius: 20,
            textAlign: 'center',
            margin: 60
  },
  flex1: {
            flex: 1
  },
  flex2: {
            flex: 2
  },
  fundo: {
            backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  botao: {
            marginHorizontal: 50,
            marginVertical: 5
  },
  espaco: {
            marginVertical: 10
  }
});

export default estilos;