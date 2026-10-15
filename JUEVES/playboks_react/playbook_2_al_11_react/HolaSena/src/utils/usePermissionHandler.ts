import { Alert, Linking } from 'react-native';

interface PermissionResponse {
  status: string;
  canAskAgain: boolean;
}

export async function handlePermissionCheck(
  permissionResponse: PermissionResponse,
  requestPermissionFn: () => Promise<PermissionResponse>,
  featureName: string
): Promise<boolean> {
  // 1. Si ya está concedido, perfecto
  if (permissionResponse.status === 'granted') {
    return true;
  }

  // 2. Si se puede volver a solicitar
  if (permissionResponse.canAskAgain) {
    const res = await requestPermissionFn();
    return res.status === 'granted';
  }

  // 3. Denegación permanente: Dirigir a la Configuración del Sistema
  Alert.alert(
    `Permiso de ${featureName} requerido`,
    `Para utilizar esta función, debes activar el permiso de ${featureName} manualmente en los ajustes de tu teléfono.`,
    [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Abrir Ajustes', 
        onPress: () => Linking.openSettings() 
      },
    ]
  );

  return false;
}