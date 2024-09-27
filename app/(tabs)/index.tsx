import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { database } from "../../lib/firebaseConfig";
import { ref, push, set, update } from "firebase/database";

export default function HomeScreen() {
  const writeUsers = () => {
    const usersRef = ref(database, "comment");

    // 削除
    // set(usersRef, null)

    set(usersRef, {
      alanisawesome: {
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing",
      },
      gracehop: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper",
      },
    })
      .then(() => {
        console.log("登録しました");
      })
      .catch((err) => console.log("エラーです"));
  };

  const updateUsers = () => {
    const hopperRef = ref(database, "users");
    update(hopperRef, {
      "alanisawesome/nickname": "Alan The Machine",
      "gracehop/nickname": "Amazing Grace",

      // alanisawesome のような単一のキーパスが指定された場合、最初の子レベルにあるデータのみが更新され、
      // 最初の子レベルを超えて渡されたあらゆるデータは set オペレーションとして扱われます。マルチパス動作により、
      // データを上書きすることなく、より長いパス（alanisawesome/nickname など）を使用できます。このため、最初の例は 2 番目の例と異なります。
      // alanisawesome: {
      //   nickname: "Alan The Machine",
      // },
      // gracehop: {
      //   nickname: "Amazing Grace",
      // },
    });
  };

  const pushPosts = () => {
    const postRef = ref(database, "posts");
    // 一意のキーはタイムスタンプに基づいているため、リストアイテムは自動的に時系列に並べ替えられます。
    const newPostRef = push(postRef);
    // set(newPostRef, {
    //   author: "alanisawesome",
    //   title: "The Turing Machine",
    // });

    // pushで生成される一意キーの取得
    set(postRef, {
      id: newPostRef.key,
      author: "alanisawesome",
      title: "The Turing Machine",
    });
  };

  // transaction
  // 特定のデータを atomically（原子的に）更新するために使用

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Check For Firebase Integration!</Text>

      <TouchableOpacity style={styles.button_container} onPress={writeUsers}>
        <Text style={styles.button_text}>ユーザーを追加</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button_container} onPress={updateUsers}>
        <Text style={styles.button_text}>ユーザーをアップデート</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button_container} onPress={pushPosts}>
        <Text style={styles.button_text}>ポストを一意に追加</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 48,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  button_text: {
    textAlign: "center",
    fontSize: 24,
    color: "#1976d2",
  },
  button_container: {
    borderRadius: 15,
    flexDirection: "row",
    margin: 16,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
  },
});
