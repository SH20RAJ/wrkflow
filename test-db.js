#!/usr/bin/env node

// Simple test script to check database connectivity and data insertion
const https = require('https');

// Test 1: Check if we can create a workflow via API
const testWorkflowCreation = () => {
    console.log('Testing workflow creation...');
    
    const postData = new URLSearchParams({
        title: 'Test Workflow',
        description: 'This is a test workflow to verify database connectivity',
        jsonContent: '{"nodes": [], "connections": []}',
        category: 'test',
        isPaid: 'false',
        isPrivate: 'false'
    }).toString();

    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/workflows/new',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
        },
    };

    const req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`Response body: ${chunk}`);
        });
        res.on('end', () => {
            console.log('Workflow creation test completed');
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
};

// Test 2: Simple GET request to check if app is running
const testAppStatus = () => {
    console.log('Testing app status...');
    
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/',
        method: 'GET',
    };

    const req = https.request(options, (res) => {
        console.log(`App status: ${res.statusCode}`);
        res.on('end', () => {
            console.log('App is running');
            // Now test workflow creation
            setTimeout(testWorkflowCreation, 1000);
        });
    });

    req.on('error', (e) => {
        console.error(`App not accessible: ${e.message}`);
    });

    req.end();
};

// Start tests
testAppStatus();
