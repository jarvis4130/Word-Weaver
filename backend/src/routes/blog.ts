import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {  createBlogInput,updateBlogInput } from "@jarvis_4130/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      console.log(user.id)
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in.",
      });
    }
  } catch (e) {
    return c.json({ error: "Invalid jwt" });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success}=createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        message:'Inputs not correct.'
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  console.log(userId)

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({ id: blog.id });
  } catch (e) {
    return c.json(e);
  }
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const {success}=updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
        message:'Inputs not correct.'
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id });
  } catch (e) {
    return c.json(e);
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user=await prisma.user.findFirst({
    where:{
      id:"27ea8fbb-1074-45cc-b4a0-50cf3b9e17b0"
    },
    select:{
      name:true
    }
  });
  console.log(user)

  const blogs = await prisma.blog.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      authorId:true,
      author:{
        select:{
          name:true
        }
      }
    }
  });

  console.log(blogs)

  return c.json({ blogs });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true,
          }
        }
      }
    });
    return c.json({ blog });
  } catch (e) {
    return c.json({
      message: "error while fetching",
    });
  }
});
