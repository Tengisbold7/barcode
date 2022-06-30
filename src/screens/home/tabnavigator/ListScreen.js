import { View, FlatList } from "react-native";
import ListItem from '../../../components/ListItem'

export default function ListScreen({ data }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} onPress={() => null} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
