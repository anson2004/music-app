import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="PaintPage" options={{ title: "Paint" }} />
      <Stack.Screen name="MiniPiano" options={{ title: "Piano" }} />
      <Stack.Screen name="MoodMusicPage" options={{ title: "Mood Music" }} />
    </Stack>
  );
}
