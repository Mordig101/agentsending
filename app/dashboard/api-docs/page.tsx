"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCode, Info, Lock, Mail, MessageSquare, Send, Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApiDocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <FileCode className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-2xl font-bold">API Documentation</h1>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          Our API documentation is currently under development. Check back soon for comprehensive guides and reference
          materials.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>API Overview</CardTitle>
              <CardDescription>Introduction to the AgentSending API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Server className="h-5 w-5 mr-2 text-primary" />
                      RESTful API
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Our API follows REST principles with predictable resource-oriented URLs and standard HTTP methods.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      Email Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Access email finder, verification, and sending capabilities programmatically through our API.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                      JSON Responses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      All API responses are returned in JSON format for easy integration with any programming language.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium mb-2">Base URL</h3>
                <code className="block p-2 bg-gray-100 rounded text-sm">https://api.AgentSending.com/v1</code>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Rate Limits</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our API implements rate limiting to ensure fair usage and system stability. Rate limits vary by plan:
                </p>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Requests per minute
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Daily limit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Free</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Basic</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pro</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">300</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Enterprise</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Learn how to authenticate your API requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Lock className="h-5 w-5 text-yellow-500 mr-2" />
                <p className="text-sm text-yellow-700">All API requests must be authenticated with an API key.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">API Keys</h3>
                <p className="text-sm text-gray-600 mb-4">
                  You can generate and manage your API keys in the Settings section of your dashboard.
                </p>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-medium mb-2">Authentication Header</h4>
                  <code className="block p-2 bg-gray-100 rounded text-sm">Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-2">Example Request</h3>
                <code className="block p-2 bg-gray-100 rounded text-sm overflow-x-auto">
                  curl -X GET https://api.AgentSending.com/v1/account <br />
                  -H "Authorization: Bearer YOUR_API_KEY" <br />
                  -H "Content-Type: application/json"
                </code>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Security Best Practices</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                    <li>Never share your API keys publicly or commit them to version control</li>
                    <li>Rotate your API keys periodically</li>
                    <li>Use environment variables to store API keys in your applications</li>
                    <li>Set appropriate permissions for each API key</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Available endpoints and their functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    Email Finder
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Endpoint
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /finder/search
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">POST</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Find email addresses by name and domain</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /finder/bulk
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">POST</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Bulk email finder for multiple contacts</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /finder/history
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GET</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Get history of email finder searches</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    Email Verification
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Endpoint
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /verify/email
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">POST</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Verify a single email address</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /verify/bulk
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">POST</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Verify multiple email addresses</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /verify/history
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GET</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Get history of email verifications</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Send className="h-5 w-5 mr-2 text-primary" />
                    Email Sender
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Endpoint
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Method
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /sender/send
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">POST</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Send a single email</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /sender/campaign
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">POST</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Create and send an email campaign</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /sender/templates
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GET</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Get available email templates</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            /sender/analytics
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GET</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Get email sending analytics</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Sample code for common API operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript">
                <TabsList className="mb-4">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>

                <TabsContent value="javascript" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Find an Email</h3>
                    <div className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        {`// Using fetch API
const API_KEY = 'your_api_key';

async function findEmail(firstName, lastName, domain) {
  try {
    const response = await fetch('https://api.AgentSending.com/v1/finder/search', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        domain
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error finding email');
    }
    
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Example usage
findEmail('John', 'Doe', 'example.com')
  .then(result => console.log(result))
  .catch(error => console.error(error));`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Verify an Email</h3>
                    <div className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        {`// Using axios
import axios from 'axios';

const API_KEY = 'your_api_key';
const client = axios.create({
  baseURL: 'https://api.AgentSending.com/v1',
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json'
  }
});

async function verifyEmail(email) {
  try {
    const response = await client.post('/verify/email', { email });
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
verifyEmail('user@example.com')
  .then(result => console.log(result))
  .catch(error => console.error(error));`}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="python" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Find an Email</h3>
                    <div className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        {`import requests

API_KEY = 'your_api_key'
BASE_URL = 'https://api.AgentSending.com/v1'

def find_email(first_name, last_name, domain):
    url = f"{BASE_URL}/finder/search"
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'firstName': first_name,
        'lastName': last_name,
        'domain': domain
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code != 200:
        raise Exception(f"Error: {response.status_code} - {response.text}")
    
    return response.json()

# Example usage
try:
    result = find_email('John', 'Doe', 'example.com')
    print(result)
except Exception as e:
    print(f"Failed to find email: {e}")`}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="php" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Find an Email</h3>
                    <div className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        {`<?php
$api_key = 'your_api_key';
$base_url = 'https://api.AgentSending.com/v1';

function find_email($first_name, $last_name, $domain) {
    global $api_key, $base_url;
    
    $url = $base_url . '/finder/search';
    $payload = json_encode([
        'firstName' => $first_name,
        'lastName' => $last_name,
        'domain' => $domain
    ]);
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
    ]);
    
    $response = curl_exec($ch);
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($status_code !== 200) {
        throw new Exception("Error: " . $status_code . " - " . $response);
    }
    
    return json_decode($response, true);
}

// Example usage
try {
    $result = find_email('John', 'Doe', 'example.com');
    print_r($result);
} catch (Exception $e) {
    echo "Failed to find email: " . $e->getMessage();
}
?>`}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="curl" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Find an Email</h3>
                    <div className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        {`curl -X POST https://api.AgentSending.com/v1/finder/search \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "domain": "example.com"
  }'`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Verify an Email</h3>
                    <div className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        {`curl -X POST https://api.AgentSending.com/v1/verify/email \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com"
  }'`}
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
