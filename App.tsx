import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';


type Produto = { 
  id: number; 
  title: string; 
  price: number; 
  thumbnail: string;
};

type Dados = { 
  products: Produto[]; 
}; 

export default function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  
  useEffect(()=>{
    carregarProdutos();
  },[]);

  async function carregarProdutos(){
    const res = await fetch('https://dummyjson.com/products'); 
    const dados: Dados = await res.json(); 
    setProdutos(dados.products); 
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Hello World!</Text>
       <FlatList 
        data={produtos} 
        keyExtractor={(prod) => prod.id.toString()} 
        renderItem={({ item }) => ( 
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Image source={{uri:item.thumbnail}} style={{width:100,height:100}}></Image>
            <Text>{item.title}</Text> 
            <Text>R$ {item.price}</Text> 
          </View> 
        )} 
      /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    fontSize: 30, 
  }
});
