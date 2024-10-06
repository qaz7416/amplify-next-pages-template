import AWS from 'aws-sdk';  

AWS.config.update({ region: 'ap-northeast-1' });  

export default async function handler(req, res) {  
  const appstream = new AWS.AppStream();  

  const userEmail = req.query.email || 'default_test_user@example.com';  
  const stackName = req.query.stackName || 'Desktop';  
  const fleetName = req.query.fleetName || 'Desktop';  

  try {  
    const response = await appstream.createStreamingURL({  
      StackName: stackName,  
      FleetName: fleetName,  
      UserId: userEmail,  
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