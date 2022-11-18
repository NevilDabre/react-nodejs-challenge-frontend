export const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:8000/session', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json()
  return data['authenticatedUser']
}

