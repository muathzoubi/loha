
interface NotificationPayload {
  title: string
  sid: string,target_url:string
}

export async function sendNotification(payload: NotificationPayload) {
  // Add this at the start of the sendNotification function

  try {
    // Log the request details (without sensitive headers)
    console.log('Sending notification with payload:', payload)

    const response = await fetch('https://api.webpushr.com/v1/notification/send/all', {
      method: 'POST',
      headers: {
        'webpushrKey':'709707c401db708cc56cfd998a516fb3',
        'webpushrAuthToken':'103077',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    // Log the response status
    console.log('Response status:', response.status)

    // Get the response text first
    const responseText = await response.text()
    console.log('Response text:', responseText)

    // Try to parse as JSON if possible
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.log('Response is not JSON:', e)
      data = responseText
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(data)}`)
    }

    return { success: true, data }
  } catch (error) {
    // Improved error logging
    console.error('Error details:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack,
    })
    
    return { 
      success: false, 
      error: (error as Error).message || 'An unknown error occurred while sending the notification'
    }
  }
}

