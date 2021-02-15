import * as SecureStore from 'expo-secure-store';
import {Connection} from './Connection';

const STORE_KEY = 'CONNECTIONS';

export async function getStoredConnections(): Promise<Connection[]> {
  const storedConnections = await SecureStore.getItemAsync(STORE_KEY);
  return !storedConnections ? [] : JSON.parse(storedConnections);
}

function getIndexOfConnection(
  storedConnections: Connection[],
  connection: Connection,
): number {
  const connectionInStore = storedConnections.find(
    (c) => c.id === connection.id,
  );
  if (!connectionInStore) {
    return -1;
  }
  return storedConnections.indexOf(connectionInStore);
}

export async function getStoredConnection(
  id: number,
): Promise<Connection | null> {
  const storedConnections = await getStoredConnections();
  const connectionInStore = storedConnections.find((c) => c.id === id);
  return connectionInStore || null;
}

export async function insertOrUpdateConnection(connection: Connection) {
  const storedConnections = await getStoredConnections();
  const index = getIndexOfConnection(storedConnections, connection);
  if (index === -1) {
    storedConnections.push(connection);
  } else {
    storedConnections[index] = connection;
  }
  await SecureStore.setItemAsync(STORE_KEY, JSON.stringify(storedConnections));
}

export async function deleteConnection(connection: Connection) {
  const storedConnections = await getStoredConnections();
  const index = getIndexOfConnection(storedConnections, connection);
  if (index === -1) {
    return;
  }
  storedConnections.splice(index, 1);
  await SecureStore.setItemAsync(STORE_KEY, JSON.stringify(storedConnections));
}
