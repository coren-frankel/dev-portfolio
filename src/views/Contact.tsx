import { Card } from 'antd'
import { Layout } from '../components/Layout'

const Contact = () => {
  return (
    <Layout navKey={3}>
      <Card title="Contact Me" style={{ maxWidth: '350px', margin: 'auto' }}>
        Check out the links in the navigation from the header to get in contact with me.
        I'll be updating this in the near future. Stay posted...
      </Card>
    </Layout>
  )
}

export default Contact