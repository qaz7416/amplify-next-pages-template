import React, { useState } from 'react';  
import { Authenticator } from '@aws-amplify/ui-react';  
import '@aws-amplify/ui-react/styles.css';  

export default function Home() {  
  const [userEmail, setUserEmail] = useState(null);  

  const handleLogin = async () => {  
    if (userEmail) {  
      try {  
        const response = await fetch(`/api/getStreamingURL?email=${encodeURIComponent(userEmail)}`, {  
          method: 'GET',  
        });  

        if (response.ok) {  
          const data = await response.json();  
          window.location.href = data.streamingUrl; // 在前端進行重定向  
        } else {  
          const data = await response.json();  
          console.error('Error:', data.error);  
        }  
      } catch (error) {  
        console.error('Fetching streaming URL failed:', error);  
      }  
    }  
  };  

  const handleSignOut = (signOut) => {  
    // 清除本地存儲中的 token 或其他認證信息  
    localStorage.removeItem('authToken'); // 假設 token 存儲在 localStorage 中  
    sessionStorage.clear(); // 清除 sessionStorage  
    // 其他需要清除的認證信息  

    signOut(); // 調用 signOut 以登出  
  };  

  return (  
    <Authenticator hideSignUp>  
      {({ signOut, user }) => {  
        if (user) {  
          const email = user.signInDetails?.loginId;  
          if (email && userEmail === null) {  
            setUserEmail(email);  
            console.log('User email:', email);  
          }  
        }  

        return (  
          <main>  
            <p>User email: {userEmail !== null ? userEmail : "Loading..."}</p>  
            <div className="flex flex-col space-y-4"> {/* 使用這個 div 包裹按鈕並應用垂直間距 */}  
              <button onClick={handleLogin} className="btn">登入並獲取串流 URL</button>  
              <button onClick={() => handleSignOut(signOut)} className="btn">登出</button>  
            </div>  
          </main>  
        );  
      }}  
    </Authenticator>  
  );  
}