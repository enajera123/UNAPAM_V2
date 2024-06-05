export async function handleLogin(identification: string, role: string) {
  try {
    const data = {
      identification: identification,
      role: role
    };

    const response = await fetch('/api/users/auth/createToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // if (role !== 'administrator') window.location.reload()

    if (!response.ok) {
      console.log('Failed to create token1');
      throw new Error('Failed to create token');
    }
    return response;

  } catch (error) {
    console.error('Error fetching token on create:', error);
    throw error;
  }
}

