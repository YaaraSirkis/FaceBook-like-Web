

async function fetchUser(token, email) {
    const response = await fetch('/api/users/' + email , {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
}

async function uploadImage(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newImage = reader.result;
            resolve(newImage);
        };
        reader.onerror = reject;
        reader.readAsDataURL(image);
    });
}

export {fetchUser, uploadImage};