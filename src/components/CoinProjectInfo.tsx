import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

interface Props {
  description?: string;
  homepage?: string[];
  whitepaperUrl?: string;
  hashingAlgorithm?: string | null;
  genesisDate?: string | null;
  twitterUsername?: string | null;
  subredditUrl?: string | null;
}

const CoinProjectInfo = ({
  description,
  homepage,
  whitepaperUrl,
  hashingAlgorithm,
  genesisDate,
  twitterUsername,
  subredditUrl,
}: Props) => {
  const openUrl = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else console.warn("Can't open URL:", url);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proje Hakkında</Text>

      <Text style={styles.description}>{description || 'Bilgi yok'}</Text>

      {homepage && homepage[0] ? (
        <TouchableOpacity onPress={() => openUrl(homepage[0])}>
          <Text style={styles.link}>Resmi Web Sitesi</Text>
        </TouchableOpacity>
      ) : null}

      {whitepaperUrl ? (
        <TouchableOpacity onPress={() => openUrl(whitepaperUrl)}>
          <Text style={styles.link}>Whitepaper</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.infoRow}>
        <Text style={styles.label}>Algoritma:</Text>
        <Text style={styles.value}>{hashingAlgorithm || 'Bilinmiyor'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Kuruluş Yılı:</Text>
        <Text style={styles.value}>
          {genesisDate ? new Date(genesisDate).getFullYear() : 'Bilinmiyor'}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Sosyal Medya:</Text>
        <View style={styles.socialLinks}>
          {twitterUsername ? (
            <TouchableOpacity onPress={() => openUrl(`https://twitter.com/${twitterUsername}`)}>
              <Text style={styles.socialLinkText}>Twitter</Text>
            </TouchableOpacity>
          ) : null}
          {subredditUrl ? (
            <TouchableOpacity onPress={() => openUrl(subredditUrl)}>
              <Text style={styles.socialLinkText}>Reddit</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2E',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 12,
    lineHeight: 20,
  },
  link: {
    color: '#7C4DFF',
    fontWeight: '600',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    color: '#aaa',
    fontWeight: '700',
    marginRight: 6,
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 14,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  socialLinkText: {
    color: '#7C4DFF',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginRight: 16,
  },
});

export default CoinProjectInfo;
