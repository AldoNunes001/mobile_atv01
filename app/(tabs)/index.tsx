import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar // Import do StatusBar
} from 'react-native';
import { Icon } from 'react-native-elements';

// Definindo interfaces para os dados
interface Transaction {
  id: number;
  name: string;
  price: string;
  date: string;
}

interface Category {
  id: number;
  icon: string;
  name: string;
  type: string;
}

type PeriodType = 'Hoje' | 'Essa Semana' | 'Esse Mês';

const ExpenseTrackerApp: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('Hoje');
  const userName: string = 'Carlos';
  const totalSpent: string = 'R$ 500';
  
  const transactions: Transaction[] = [
    { id: 1, name: 'Pizza', price: 'R$ 30', date: '20/01/2020' },
    { id: 2, name: 'Coca-Cola', price: 'R$ 10', date: '20/01/2020' },
  ];

  const categories: Category[] = [
    { id: 1, icon: 'flight', name: 'Viagem', type: 'material' },
    { id: 2, icon: 'home', name: 'Casa', type: 'material' },
    { id: 3, icon: 'local-dining', name: 'Alimentação', type: 'material' },
    { id: 4, icon: 'directions-car', name: 'Transporte', type: 'material' },
    { id: 5, icon: 'build', name: 'Outros', type: 'material' },
  ];

  return (
    <>
      {/* Define a cor do StatusBar e o estilo do texto (ícones do sistema) */}
      <StatusBar backgroundColor="#E54B4B" barStyle="light-content" />

      {/* SafeAreaView que cobre apenas a área do notch (topo) com cor laranja */}
      <SafeAreaView style={styles.safeAreaTop} />

      {/* View que vai conter todo o restante do layout */}
      <View style={styles.container}>
        {/* Header com fundo laranja */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem vindo, {userName}</Text>
          
          <Text style={styles.spentText}>Você gastou hoje</Text>
          <Text style={styles.amountText}>{totalSpent}</Text>
          
          <Text style={styles.periodLabel}>ESCOLHER PERÍODO:</Text>
          <View style={styles.periodSelector}>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'Hoje' && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod('Hoje')}
            >
              <Text style={styles.periodButtonText}>Hoje</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'Essa Semana' && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod('Essa Semana')}
            >
              <Text style={styles.periodButtonText}>Essa Semana</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'Esse Mês' && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod('Esse Mês')}
            >
              <Text style={styles.periodButtonText}>Esse Mês</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Conteúdo principal */}
        <SafeAreaView style={styles.mainContent}>
          {/* Categorias */}
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryButton}>
                <Icon 
                  name={category.icon} 
                  type={category.type} 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Transações */}
          <ScrollView style={styles.transactionsContainer}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionPrice}>
                    {transaction.name} ({transaction.price})
                  </Text>
                </View>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: '#E54B4B', // Cor que vai até a parte do notch
  },
  container: {
    flex: 1,
    backgroundColor: '#F7EBE8',
  },
  header: {
    backgroundColor: '#E54B4B',
    padding: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  spentText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
  },
  amountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  periodLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    marginTop: 30,
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  periodButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectedPeriod: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  periodButtonText: {
    color: 'white',
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F7EBE8',
    marginTop: 10,
    paddingTop: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  categoryButton: {
    width: 48,
    height: 48,
    backgroundColor: '#444140',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionsContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExpenseTrackerApp;