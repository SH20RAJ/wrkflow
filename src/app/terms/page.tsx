import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME, SITE_CONFIG } from "@/lib/constants";

export default function TermsPage() {
    return (
        <MainLayout>
            <div className="container mx-auto py-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
                    <p className="text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Acceptance of Terms</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                By accessing and using {APP_NAME} ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                                If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>2. Description of Service</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                {APP_NAME} is a marketplace platform that allows users to share, discover, and monetize N8N automation workflows. 
                                The Service includes:
                            </p>
                            <ul>
                                <li>Workflow sharing and discovery</li>
                                <li>User accounts and profiles</li>
                                <li>Monetization tools for creators</li>
                                <li>Community features and interactions</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>3. User Accounts</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                To access certain features of the Service, you must create an account. You are responsible for:
                            </p>
                            <ul>
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Providing accurate and complete information</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>4. Content and Workflows</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                Users may upload, share, and distribute N8N workflows through the Service. By uploading content, you:
                            </p>
                            <ul>
                                <li>Retain ownership of your original content</li>
                                <li>Grant us a license to host, display, and distribute your content</li>
                                <li>Represent that you have the right to share the content</li>
                                <li>Agree that your content complies with our community guidelines</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>5. Prohibited Uses</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                You may not use the Service to:
                            </p>
                            <ul>
                                <li>Upload malicious or harmful workflows</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe on intellectual property rights</li>
                                <li>Harass, abuse, or harm other users</li>
                                <li>Attempt to gain unauthorized access to the Service</li>
                                <li>Upload content containing personal data without consent</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>6. Monetization and Payments</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                Creators may monetize their workflows through the Service. By participating in monetization:
                            </p>
                            <ul>
                                <li>You agree to our revenue sharing terms</li>
                                <li>You are responsible for applicable taxes</li>
                                <li>Payments are processed through third-party providers</li>
                                <li>We reserve the right to suspend monetization for policy violations</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>7. Privacy and Data</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                                use, and protect your information. By using the Service, you consent to our data practices as 
                                described in the Privacy Policy.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>8. Disclaimer of Warranties</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                The Service is provided "as is" without any warranties, express or implied. We do not guarantee:
                            </p>
                            <ul>
                                <li>The accuracy or reliability of workflows</li>
                                <li>Uninterrupted or error-free service</li>
                                <li>The security of your data</li>
                                <li>Compatibility with your systems</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>9. Limitation of Liability</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                In no event shall {APP_NAME} be liable for any indirect, incidental, special, consequential, 
                                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                                or other intangible losses.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>10. Changes to Terms</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                We reserve the right to modify these terms at any time. We will notify users of significant 
                                changes via email or through the Service. Continued use of the Service after changes 
                                constitutes acceptance of the new terms.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>11. Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                            <p>
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <p>
                                Email: legal@{SITE_CONFIG.url.replace('https://', '')}<br />
                                Website: {SITE_CONFIG.url}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}