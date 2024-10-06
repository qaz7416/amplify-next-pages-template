// import AWS from 'aws-sdk';  

// AWS.config.update({ region: 'ap-northeast-1' });  

// export default async function handler(req, res) {  
//   const appstream = new AWS.AppStream();  

//   const userEmail = req.query.email || 'default_test_user@example.com';  
//   const stackName = req.query.stackName || 'Desktop';  
//   const fleetName = req.query.fleetName || 'Desktop';  

//   try {  
//     const response = await appstream.createStreamingURL({  
//       StackName: stackName,  
//       FleetName: fleetName,  
//       UserId: userEmail,  
//       Validity: 3600,  
//     }).promise();  

//     const streamingUrl = response.StreamingURL;  
//     console.log(`Streaming URL generated for ${userEmail}: ${streamingUrl}`);  

//     res.json({ streamingUrl }); // 返回 JSON 包含 URL  
//   } catch (error) {  
//     console.error(`Error generating streaming URL for ${userEmail}: ${error.message}`);  
//     res.status(500).json({ error: error.message });  
//   }  
// }

// import { NextApiRequest, NextApiResponse } from 'next';  
// import AWS from 'aws-sdk';  

// AWS.config.update({ region: 'ap-northeast-1' });  

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
//   const appstream = new AWS.AppStream();  

//   const userEmail = req.query.email || 'default_test_user@example.com';  
//   const stackName = req.query.stackName || 'Desktop';  
//   const fleetName = req.query.fleetName || 'Desktop';  

//   try {  
//     const response = await appstream.createStreamingURL({  
//       StackName: stackName,  
//       FleetName: fleetName,  
//       UserId: userEmail as string, // 明確類型為 string  
//       Validity: 3600,  
//     }).promise();  

//     const streamingUrl = response.StreamingURL;  
//     console.log(`Streaming URL generated for ${userEmail}: ${streamingUrl}`);  

//     res.json({ streamingUrl }); // 返回 JSON 包含 URL  
//   } catch (error) {  
//     console.error(`Error generating streaming URL for ${userEmail}: ${error.message}`);  
//     res.status(500).json({ error: error.message });  
//   }  
// }

import { NextApiRequest, NextApiResponse } from 'next';  
import AWS from 'aws-sdk';  

AWS.config.update({ region: 'ap-northeast-1' });  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  const appstream = new AWS.AppStream();  

  // 從請求查詢獲取參數，並設置默認值  
  const userEmail = req.query.email || 'default_test_user@example.com';  
  const stackName = req.query.stackName || 'Desktop';  
  const fleetName = req.query.fleetName || 'Desktop';  

  try {  
    // 調用 createStreamingURL 並使用正確的參數名稱  
    const response = await appstream.createStreamingURL({  
      StackName: stackName as string,  // 確保將 StackName 正確傳遞及使用類型註解  
      FleetName: fleetName as string,  // 確保將 FleetName 正確傳遞及使用類型註解  
      UserId: userEmail as string,     // 確保將 UserId 正確傳遞及使用類型註解  
      Validity: 3600,  
    }).promise();  

    const streamingUrl = response.StreamingURL;  
    console.log(`Streaming URL generated for ${userEmail}: ${streamingUrl}`);  

    res.json({ streamingUrl }); // 返回 JSON 包含 URL  
  } catch (error) {  
    console.error(`Error generating streaming URL for ${userEmail}: ${error.message}`);  
    res.status(500).json({ error: error.message });  
  }  
}